// pages/settings.tsx
"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { dummyStats } from '../data/dummyData'
import Navbar from '@/components/Navbar'

type StatsPoint = { period: string; count: number }

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function SettingsPage() {
  return (
    <>
    <Navbar />
    <div className=" mx-auto py-6 p-6 sm:px-28 space-y-12 bg-filwhite">
      <h1 className="text-3xl font-bold">Settings</h1>
      <StatsSection />
      <ProfileSection />
    </div>
    </>
  )
}

function StatsSection() {
  const periods = ['today', 'weekly', 'monthly', 'all']
  // const [period, setPeriod] = useState<typeof periods[number]>('today')
  // const { data, error } = useSWR<StatsPoint[]>(`/api/stats?range=${period}`, fetcher)
  const [period, setPeriod] = useState<typeof periods[number]>('today')
  let error = false
  const data = dummyStats[period]

  return (
    <section>
      
      <h2 className="text-xl font-semibold mb-4">Your Reading Stats</h2>
      <div className="flex space-x-2 mb-4">
        {periods.map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`
              px-3 py-1 rounded 
              ${period === p ? 'bg-filblue text-white' : 'bg-gray-200'}
            `}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <div className="h-64">
        {error && <p className="text-red-500">Failed to load.</p>}
        {!data ? (
          <p>Loading…</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#008cff" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

function ProfileSection() {
  const [username, setUsername] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [avatarFile])

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file && file.size > 5e6) {
      alert('Max size 5 MB')
      return
    }
    if (file && !['image/jpeg','image/png'].includes(file.type)) {
      alert('Only JPG/PNG')
      return
    }
    setAvatarFile(file)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // 1) update username
    await axios.put('/api/user', { username })
    // 2) if avatar, get presigned URL & upload
    if (avatarFile) {
      const { uploadUrl, key } = (await axios.post('/api/avatar-upload')).data
      await axios.put(uploadUrl, avatarFile, {
        headers: {'Content-Type': avatarFile.type}
      })
      await axios.put('/api/user/avatar', { key })
    }
    alert('Updated!')
  }

  return (
    
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Avatar</label>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
        {previewUrl && (
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image src={previewUrl} width={96} height={96} alt="avatar preview" />
          </div>
        )}
        <button type="submit" className="px-5 py-2 bg-filblue text-white rounded">
          Save Changes
        </button>
      </form>
    </section>
  )
}
