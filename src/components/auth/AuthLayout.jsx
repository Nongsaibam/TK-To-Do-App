export default function AuthLayout({ title, subtitle, imageLabel, imageSrc, children }) {
  return (
    <div className="min-h-screen bg-[#f6f7f9] px-3 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden items-center justify-center border-b border-[#e5e7eb] bg-[#fafafa] p-5 sm:flex lg:border-b-0 lg:border-r lg:p-14">
          <div className="w-full max-w-xl">
            {title ? <h1 className="text-3xl font-semibold leading-tight text-[#111827] lg:text-4xl">{title}</h1> : null}
            {subtitle ? <p className="mt-4 max-w-lg text-sm leading-7 text-[#6b7280]">{subtitle}</p> : null}
            <div className="mt-6 rounded-[8px] border border-[#e5e7eb] bg-white p-4 text-center lg:mt-10 lg:p-8">
              {imageSrc ? (
                <img className="mx-auto max-h-[260px] w-full object-contain lg:max-h-[430px]" src={imageSrc} alt={imageLabel} />
              ) : (
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-[8px] bg-[#f3f4f6] text-center text-sm font-medium text-[#374151]">
                  {imageLabel}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 sm:p-8 lg:p-14">{children}</div>
      </div>
    </div>
  );
}
