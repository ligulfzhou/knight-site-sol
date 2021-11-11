
export default function FaqSection() {
    return (
        <section className="text-white bg-gray-500 body-font" id="faq">
            <div className="container px-5 pt-24 mx-auto">
                <div className="text-center mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">FAQ</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-white"></p>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                    </div>
                </div>
            </div>
            <div className="container px-5 pb-2 mx-auto flex flex-wrap">
                <div tabIndex={0} className="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div className="collapse-title text-xl font-medium">
                        What are the Pixel Knights?
                    </div>
                    <div className="collapse-content">
                        <p>Pixel Knights are a collection of 10,000 randomly generated Pixel Knight NFTs on the Solana blockchain.</p>
                    </div>
                </div>
            </div>
            <div className="container px-5 pb-2 mx-auto flex flex-wrap">
                <div tabIndex={0} className="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div className="collapse-title text-xl font-medium">
                        When are Pixel Knights launching ?
                    </div>
                    <div className="collapse-content">
                        <p> It should be on Nov. Join our <a href="https://discord.gg/kvyMYEWXes" target="_blank" rel="noreferrer" className="text-red-600"> discord</a> and follow our <a href="https://twitter.com/Pixel__Knights" target="_blank" rel="noreferrer" className="text-red-600"> twitter </a> to get latest announcements</p>
                        {/* <p>The project is launching in <span className="badge badge-outline">7th Nov 0:00 UTC</span>(<span className="badge badge-outline">6th Nov 19:00 in California, USA</span>, and <span className="badge badge-outline">7th Nov 8:00 in Shanghai, China</span>), stay tuned.</p> */}
                    </div>
                </div>
            </div>
            <div className="container px-5 pb-2 mx-auto flex flex-wrap">
                <div tabIndex={0} className="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div className="collapse-title text-xl font-medium">
                        How much does each Pixel Knight cost?
                    </div>
                    <div className="collapse-content">
                        <p>Each Pixel Knight is totally free to mint.</p>
                    </div>
                </div>
            </div>
            <div className="container w-full px-5 pb-2 mx-auto flex flex-wrap">
                <div tabIndex={0} className="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div className="collapse-title text-xl font-medium">
                        How to participate in premint?
                    </div>
                    <div className="collapse-content">
                        <p> Join our <a href="https://discord.gg/kvyMYEWXes" target="_blank" rel="noreferrer" className="text-red-600"> discord</a> and follow our <a href="https://twitter.com/Pixel__Knights" target="_blank" rel="noreferrer" className="text-red-600"> twitter </a> to get latest announcements</p>
                        {/* <p>We do not have any private sale, premint or etc.</p> */}
                    </div>
                </div>
            </div>
            <div className="container px-5 w-full pb-20 mx-auto flex flex-wrap">
                <div tabIndex={0} className="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div className="collapse-title text-xl font-medium">
                        when do the Pixel Knights reveal after mint?
                    </div>
                    <div className="collapse-content">
                        <p>They reveal instantly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
