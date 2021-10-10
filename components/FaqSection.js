
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
                <div tabindex="0" class="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div class="collapse-title text-xl font-medium">
                        What are the Pixel Knights?
                    </div>
                    <div class="collapse-content">
                        <p>Pixel Knights are a collection of 10,000 randomly generated Pixel Knight NFTs on the Ethereum blockchain.</p>
                    </div>
                </div>
            </div>
            <div className="container px-5 pb-2 mx-auto flex flex-wrap">
                <div tabindex="0" class="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div class="collapse-title text-xl font-medium">
                        When are Pixel Knights launching ?
                    </div>
                    <div class="collapse-content">
                        <p>The project is launching in <span class="badge badge-outline">31th Oct 0 AM UTC</span>(<span class="badge badge-outline">30th Oct 17 PM in California, USA</span>, and <span class="badge badge-outline">31th Oct 8 AM in Shanghai, China</span>), stay tuned.</p>
                    </div>
                </div>
            </div>
            <div className="container px-5 pb-2 mx-auto flex flex-wrap">
                <div tabindex="0" class="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div class="collapse-title text-xl font-medium">
                        How much does each Pixel Knight cost?
                    </div>
                    <div class="collapse-content">
                        <p>Each Pixel Knight will cost 0.05 ETH</p>
                    </div>
                </div>
            </div>
            <div className="container w-full px-5 pb-2 mx-auto flex flex-wrap">
                <div tabindex="0" class="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div class="collapse-title text-xl font-medium">
                        How to participate in premint?
                    </div>
                    <div class="collapse-content">
                        <p>Join our discord to see the details.</p>
                    </div>
                </div>
            </div>
            <div className="container px-5 w-full pb-20 mx-auto flex flex-wrap">
                <div tabindex="0" class="w-full collapse border rounded-box border-base-300 collapse-plus">
                    <div class="collapse-title text-xl font-medium">
                        when do the Pixel Knights reveal after mint?
                    </div>
                    <div class="collapse-content">
                        <p>They reveal instantly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}