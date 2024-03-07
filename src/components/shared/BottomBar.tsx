import { bottombarLinks } from '@/constants';
import { INavLink } from '@/types';
import {NavLink} from 'react-router-dom'

const BottomBar = () => {
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link: INavLink) => {
            return (
                <NavLink
                  key={link.label}
                  to={link.route}
                  className={({ isActive }) =>
                    [
                      "flex-center flex-col gap-1 p-2 transition",
                      isActive ? "bg-primary-500 rounded-[10px]" : "",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={link.imgURL}
                        alt={link.label}
                        width={16}
                        height={16}
                        className={
                          isActive ? "invert-white" : "group-hover:invert-white"
                        }
                      />
                      <p className='tiny0-edium text-light-2'>{link.label}</p>
                    </>
                  )}
                </NavLink>

            );
          })}

    </section>
  )
}

export default BottomBar