import AnimatedText from "./AnimatedText";
import { BoxReveal } from "@/components/magicui/box-reveal";

export default function Subscriptions() {
    return (
        <section className="relative w-full py-16 bg-[#8b5cf6] overflow-hidden">
            <div className="absolute -top-10 -right-20 w-80 h-80 bg-[#f97316] opacity-30 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-lg">

                        <BoxReveal boxColor={"#8b5cf6"} duration={0.5} width="100%">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Flexible Subscription Options
                            </h2>
                        </BoxReveal>
                        <BoxReveal boxColor={"#8b5cf6"} duration={0.5} width="fit-content">
                            <p className="text-lg text-white/90 mb-8">
                                Access a wide range of quality content with our diverse subscription plans.
                            </p>
                        </BoxReveal>
                        <BoxReveal boxColor={"#8b5cf6"} duration={0.5} width="fit-content">
                            <p className="text-lg text-white/90 mb-8">
                                Choose the duration that suits you best and enjoy learning at reasonable prices.
                            </p>
                        </BoxReveal>
                        <div>
                            <button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-3 px-6 rounded-md transition-colors">
                                Discover Subscription Plans
                            </button>
                        </div>
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
