
export default function HeroSection() {
    return (
        <section className="text-white body-font bg-gray-900">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Welcome to
                        <br className="hidden lg:inline-block" />Pixel Knights
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Pixel Knights is a collection of 10,000 randomly generated Pixel Knight NFTs on the Ethereum blockchain.
                        {/* A collection of unique, cool and diverse knights, ready to leave a mark in the NFT space! */}
                        There are 8,000 human, 1,000 elf and 1,000 orc.
                        They are brave, ambitious and strong, and ready to fight for their territory.

                        {/* Stay Tuned. */}
                    </p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img className="object-cover object-center rounded" alt="hero" src="https://f002.backblazeb2.com/file/pixelknights/knights.jpeg" />
                </div>
            </div>
        </section>
    )
}