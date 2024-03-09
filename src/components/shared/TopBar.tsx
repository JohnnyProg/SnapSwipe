import { useUserContext } from '@/context/AuthContext'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const TopBar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate()
    const {user} = useUserContext()
    useEffect(() => {
        if (isSuccess) {
            navigate('/sign-in')
        }
    }, [isSuccess])
  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link to='/' className='flex gap-3 items-center'>
                <img src={import.meta.env.BASE_URL + '/assets/images/logo.svg'} alt='logo' width={130} height={325} />
            </Link>
            <div className='flex gap-4'>
                <Button variant='ghost' className="shad-button_ghost" onClick={() => signOut()}>
                    <img src={`${import.meta.env.BASE_URL}/assets/icons/logout.svg`} alt='logout' />
                </Button>
                <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                    <img src={user.imageUrl || `${import.meta.env.BASE_URL}/assets/images/profile-placeholder.svg`} alt='avatar' className='h-8 w-8 rounded-full'/>
                </Link>
            </div>
        </div>
        
    </section>
  )
}

export default TopBar