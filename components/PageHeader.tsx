'use client'

interface PageHeaderProps {
  title: string
  description: string
  backgroundGradient?: string
}

export default function PageHeader({ 
  title, 
  description, 
  backgroundGradient = "from-gray-50 to-gray-100" 
}: PageHeaderProps) {
  return (
    <section className={`bg-gradient-to-br ${backgroundGradient} pt-24 lg:pt-32 pb-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  )
}