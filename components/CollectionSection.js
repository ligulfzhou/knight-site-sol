
export default function CollectionSection() {
    return (
        <section className="text-white body-font bg-gray-700" id="collection">
            <div className="container px-5 py-24 mx-auto">
                <div className="text-center mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">Collection</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-white">What do Pixel Knights consist of?</p>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                    </div>
                </div>
                {/* <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-white text-lg title-font font-medium mb-2">elf (精灵)</h2>
                        <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                        <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                    <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                            <circle cx="6" cy="6" r="3"></circle>
                            <circle cx="6" cy="18" r="3"></circle>
                            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                        </svg>
                    </div>
                </div> */}
                <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center text-indigo-500 flex-shrink-0">
                        <img src="https://f002.backblazeb2.com/file/pixelknights/human.png" className="sm:w-32 sm:h-32 w-10 h-10 rounded-full" />
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-white text-lg title-font font-medium mb-2">Human (人类)</h2>
                        <p>
                            <div class="badge badge-lg">Mounts: Horse</div>
                            <div class="badge badge-lg">Weapon: Polorarm</div>
                            <div class="badge badge-lg">Hat: Metal</div>
                        </p>
                        <p className="mt-4">
                            There are 8,000 human pixel knights. They ride on horses, ware metal hats, use their polorarm to expand their territory.
                        </p>

                    </div>
                </div>
                <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-white text-lg title-font font-medium mb-2">elf (精灵)</h2>
                        <p>
                            <div class="badge badge-lg">Mounts: Elk</div>
                            <div class="badge badge-lg">Weapon: Wand</div>
                            <div class="badge badge-lg">Hat: Cloth</div>
                        </p>
                        <p className="mt-4">
                            There are 1,000 elf. They ride on elk, ware cloth hats, use their wands to resist invasion.
                        </p>
                    </div>
                    <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center text-indigo-500 flex-shrink-0">
                        <img src="https://f002.backblazeb2.com/file/pixelknights/elf.png" className="sm:w-32 sm:h-32 w-10 h-10 rounded-full" />
                    </div>
                </div>
                <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center text-indigo-500 flex-shrink-0">
                        <img src="https://f002.backblazeb2.com/file/pixelknights/orc.png" className="sm:w-32 sm:h-32 w-10 h-10 rounded-full" />
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-white text-lg title-font font-medium mb-2">Orc (兽人)</h2>
                        <p>
                            <div class="badge badge-lg">Mounts: Wild boar</div>
                            <div class="badge badge-lg">Weapon: Axe</div>
                            <div class="badge badge-lg">Hat: Leather</div>
                        </p>
                        <p className="mt-4">
                            There are 1,000 orc pixel knights. They ride on wild boars, ware leather hats, use their axes to fight for freedom.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}