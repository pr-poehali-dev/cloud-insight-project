import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Какой камень лучше выбрать для кухни?",
    answer:
      "Для кухонной столешницы мы рекомендуем гранит или кварцит — они устойчивы к царапинам, высоким температурам и пятнам. Мрамор требует более бережного ухода, но смотрится исключительно. Мы поможем подобрать материал, исходя из вашего стиля жизни и дизайна кухни.",
  },
  {
    question: "Сколько занимает изготовление изделия?",
    answer:
      "Стандартные сроки: замер — 1–2 дня после договора, изготовление — 7–14 рабочих дней в зависимости от сложности и породы камня, монтаж — 1 день. Для срочных заказов возможно ускорение — уточните при заявке.",
  },
  {
    question: "Выезжаете ли вы для замера на объект?",
    answer:
      "Да, выезд замерщика входит в стоимость заказа при изготовлении изделия. Специалист приедет в удобное для вас время, снимет точные размеры и проконсультирует по выбору материала прямо на месте.",
  },
  {
    question: "Можно ли заказать нестандартный размер или форму?",
    answer:
      "Все наши изделия изготавливаются по индивидуальным размерам. Мы работаем с любыми формами — прямоугольные, криволинейные, с радиусными углами и вырезами под мойку или плиту. Можем изготовить по эскизу вашего дизайнера.",
  },
  {
    question: "Какой уход нужен за натуральным камнем?",
    answer:
      "Большинство пород достаточно протирать мягкой влажной тряпкой и нейтральным моющим средством. Мрамор и известняк рекомендуется пропитывать защитным составом раз в год. При необходимости мы проводим полировку и реставрацию изделий.",
  },
  {
    question: "Как оформить заказ?",
    answer:
      "Оставьте заявку через форму или позвоните нам. Мы обсудим ваш проект, согласуем материал и размеры, выедем на замер и подготовим коммерческое предложение. После подписания договора и внесения предоплаты — запускаем производство.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}