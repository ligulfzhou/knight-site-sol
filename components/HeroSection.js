
export default function HeroSection() {
    return (
        <section className="text-white body-font bg-gray-900">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Welcome to {' '}
                        <br className="hidden lg:inline-block" />Pixel Knights
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Pixel Knights is a collection of 10,000 randomly generated Pixel Knight NFTs on the Ethereum blockchain.
                        {/* A collection of unique, cool and diverse knights, ready to leave a mark in the NFT space! */}
                        There are 8,000 human, 1,000 elf and 1,000 orc.
                        They are brave, ambitious and strong, and ready to fight for their territory.

                        {/* Stay Tuned. */}
                    </p>
                    <p className="pb-4 text-indigo-500">Join our discord and follow our twitter to get latest announcements. And Stay Tuned.
                        {/* Pixel Knights will drop at N/A */}
                        {/* 7th Nov, 0:00 UTC,  */}
                        {/* <br className="hidden lg:inline-block" />Join our discord and follow our twitter to get latest announcements. And Stay Tuned. */}
                    </p>
                    <div className="flex justify-center">
                        <a href="https://twitter.com/Pixel__Knights" target="_blank" className="inline-flex border-0 py-2 px-6 focus:outline-none rounded text-lg">
                            <img src="/twitter.svg" className=""/>
                        </a>
                        <a href="https://discord.gg/kvyMYEWXes" target="_blank" className="inline-flex border-0 py-2 px-6 text-indigo-500 focus:outline-none rounded text-lg">
                            <img src="/discord.svg" className=""/>
                        </a>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img className="object-cover object-center rounded" alt="hero" src="https://f002.backblazeb2.com/file/pixelknights/knights.jpeg" />
                </div>
            </div>
        </section>
    )
}