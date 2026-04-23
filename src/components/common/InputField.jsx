import { cn } from '../../utils/helpers';

export default function InputField({ icon, label, id, rightElement, ...props }) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      {label ? <span className="text-sm font-semibold text-[#2f3542]">{label}</span> : null}
      <span className="relative block">
        {icon ? (
          <img
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-70"
            src={icon}
            alt=""
            aria-hidden="true"
          />
        ) : null}
        <input
          id={id}
          className={cn(
            'input-base h-12 shadow-[0_8px_20px_rgba(15,23,42,0.04)] placeholder:text-[#9aa3b2]',
            icon && '!pl-14',
            rightElement && '!pr-12'
          )}
          {...props}
        />
        {rightElement ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
        ) : null}
      </span>
    </label>
  );
}
