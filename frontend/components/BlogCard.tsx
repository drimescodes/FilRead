import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
    title: string;
    slug: string;
    category: string;
    date: string;
    readTime: string;
    // imageUrl: string;  // Add imageUrl prop
    imageUrl: any;
}

const BlogCard = ({ title, slug, category, date, readTime, imageUrl }: BlogCardProps) => {
    return (
        <Link href={`/blogs/${slug}`} passHref>
            <section className="border border-filblack w-[21rem] h-[23rem] sm:w-[22rem] sm:h-[24rem] lg:w-[26rem] lg:h-[26rem] bg-filwhite p-3 rounded-md relative group overflow-hidden cursor-pointer">
                <div className="overflow-hidden rounded-md">
                    <Image
                        src={imageUrl}  // Use dynamic image URL
                        alt={title}
                        className="rounded-md transform transition-transform duration-500 ease-in-out group-hover:scale-105 sm:group-hover:scale-110"
                        // layout="fill"
                        width={416}
                        height={300}
                    />
                </div>
                <div>
                    <span className="border-[1.5px] border-filblue absolute sm:top-[16rem] top-[13.4rem] left-0 h-10"></span>
                    <p className="pt-8 text-filblue font-semibold">{category}</p>
                </div>
                <p className="pt-4 font-bold text-lg text-filblack">{title}</p>
                <p className="text-readreblack-6 text-sm absolute bottom-4">
                    {date}<span className="pl-6">{readTime}</span>
                </p>
            </section>
        </Link>
    );
};

export default BlogCard;
