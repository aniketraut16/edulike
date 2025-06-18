import AnimatedText from "./AnimatedText";

export default function Subscriptions() {
    return (
        <section className="relative w-full py-16 bg-[#8b5cf6] overflow-hidden">
            <div className="absolute -top-10 -right-20 w-80 h-80 bg-[#f97316] opacity-30 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-lg">
                        <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Flexible Subscription Options
                        </AnimatedText>
                        <AnimatedText className="text-lg text-white/90 mb-8" delay={0.1}>
                            Access a wide range of quality content with our diverse subscription plans.
                            Choose the duration that suits you best and enjoy learning at reasonable prices.
                        </AnimatedText>
                        <AnimatedText as="div" delay={0.2}>
                            <button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-3 px-6 rounded-md transition-colors">
                                Discover Subscription Plans
                            </button>
                        </AnimatedText>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src="/images/subscription.png"
                            alt="Subscription options illustration"
                            className="max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
