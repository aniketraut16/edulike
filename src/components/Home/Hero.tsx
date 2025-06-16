export default function Hero() {
    return (
        <section className="hero-section py-16 md:py-24 min-h-[97vh] flex items-center" style={{ borderBottomRightRadius: '35%' }}>
            {/* Background elements */}
            <div className="hero-background absolute top-0 left-0 w-full h-full z-0">
                <img
                    src="/hero-background.svg"
                    alt="Background decoration"
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center relative z-10">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Learn Anything. From Anywhere.
                    </h1>
                    <p className="text-lg md:text-xl text-purple-100 mb-8">
                        Live sessions or self-paced courses—choose how you want to grow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-white hover:bg-purple-50 text-purple-700 font-medium py-3 px-6 rounded-lg transition-all">
                            Explore Courses
                        </button>
                        <button className="bg-transparent hover:bg-purple-800 text-white border border-white font-medium py-3 px-6 rounded-lg transition-all">
                            Join a Free Demo
                        </button>
                    </div>
                </div>
                <div className="md:w-2/3 flex justify-center">
                    <div className="relative w-full max-w-lg h-96 md:h-[28rem]">
                        <img
                            src="/hero-illustration.svg"
                            alt="Person learning online"
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
