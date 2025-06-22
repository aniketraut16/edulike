export default function Subscriptions() {
    return (
        <section className="py-16 bg-white" >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-6xl font-bold mb-4 text-gray-800">Your Pace, Your Plan</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that fits your learning style and goals.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mx-auto justify-evenly items-center lg:items-stretch">
                    {/* Free Plan */}
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-3xl font-bold text-[#461217] mb-3 font-raleway">Free</h3>
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                <span className="font-semibold">Default plan.</span> Browse all courses and purchase only what you want, when you want. Pay as you go, no monthly commitment.
                            </p>
                            <div className="flex items-end mb-8">
                                <span className="text-4xl font-bold text-[#461217]">$0</span>
                                <span className="text-gray-600 ml-1 text-sm">/ month</span>
                            </div>
                            <div className="mt-auto">
                                <button className="w-full bg-gray-500/80 backdrop-blur-sm hover:bg-gray-600/90 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 border border-gray-400/30">
                                    Start with Free
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Plus Plan */}
                    <div className="bg-gradient-to-br from-blue-500/80 via-blue-600/70 to-blue-900/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-700/40 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-600/20 to-blue-900/20 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-sm font-raleway">Plus</h3>
                            <p className="text-white/95 mb-6 text-sm leading-relaxed drop-shadow-sm">
                                <span className="font-semibold">Get free access to a selection of our top courses.</span> Perfect for regular learners who want more value and variety.
                            </p>
                            <div className="flex items-end mb-8">
                                <span className="text-4xl font-bold text-white drop-shadow-sm">$7.99</span>
                                <span className="text-white/90 ml-1 text-sm">/ month</span>
                            </div>
                            <div className="mt-auto">
                                <button className="w-full bg-gradient-to-r from-blue-700/80 to-blue-900/80 backdrop-blur-sm hover:from-blue-800/90 hover:to-blue-900/90 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 border border-blue-800/30">
                                    Upgrade to Plus
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-yellow-300/80 via-yellow-400/70 to-yellow-600/80 backdrop-blur-xl rounded-3xl p-8 border border-yellow-300/40 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-yellow-400/20 to-yellow-700/20 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-3xl font-bold text-yellow-900 mb-3 font-raleway">Premium</h3>
                            <p className="text-yellow-900/90 mb-6 text-sm leading-relaxed">
                                <span className="font-semibold">Unlock access to our full course library and exclusive features.</span> Enjoy many more courses, advanced tools, and priority support.
                            </p>
                            <div className="flex items-end mb-8">
                                <span className="text-4xl font-bold text-yellow-900">$14.99</span>
                                <span className="text-yellow-800/80 ml-1 text-sm">/ month</span>
                            </div>
                            <div className="mt-auto">
                                <button className="w-full bg-gradient-to-r from-yellow-700/80 to-yellow-900/80 backdrop-blur-sm hover:from-yellow-800/90 hover:to-yellow-900/90 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 border border-yellow-800/30">
                                    Go Premium
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}