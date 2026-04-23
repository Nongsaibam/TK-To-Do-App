import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import xIcon from '../../assets/icons/x.svg';

const providers = [
  {
    name: 'Facebook',
    icon: FaFacebookF,
    className: 'bg-[#4267b2] text-white',
  },
  {
    name: 'Google',
    icon: FcGoogle,
    className: 'bg-white text-[#171717]',
  },
  {
    name: 'X',
    image: xIcon,
    className: 'bg-white',
  },
];

export default function SocialLogin() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#374151]">Continue with</span>
      {providers.map(({ name, icon: Icon, image, className }) => (
        <button
          key={name}
          type="button"
          className={`flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#e5e7eb] text-lg opacity-90 transition hover:border-[#9ca3af] hover:opacity-100 ${className}`}
          aria-label={`Continue with ${name}`}
          title={`${name} demo button`}
        >
          {image ? <img className="h-5 w-5" src={image} alt="" aria-hidden="true" /> : <Icon />}
        </button>
      ))}
    </div>
  );
}
