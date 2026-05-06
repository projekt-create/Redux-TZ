import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReducer, postReducer, deleteReducer } from '../reducer/ApiReducer'
import toast from 'react-hot-toast'

const Data = () => {
    const dispatch = useDispatch()

    const fakeCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [modalOpen, setModalOpen] = useState(false)
    const [postuser, setPostUser] = useState({
        name: '',
        surname: '',
        country: '',
        email: '',
        phone: '',
        img: ''
    })

    const {data, isLoading, isError, isNewloading, isNewError} = useSelector((state) => state.api)

    useEffect(() => {
        dispatch(fetchReducer())
    }, [])

    isLoading && toast.loading('Loading...', {
        id: 'loading'
    })

    isError && toast.error(isError, {
        id: 'error'
    })

    isNewError && toast.error(isNewError, {
        id: 'error'
    })

    data && toast.success('Success', {
        id: 'success'
    }),{
        duration: 2000
    }

    if(isLoading) {
    }else {
        toast.dismiss('loading')
    }

    const handlePostUser = (e) => {
        e.preventDefault()
        dispatch(postReducer(postuser))
        setModalOpen(false)
    }

    const handleDeleteUser = (id) => {
        dispatch(deleteReducer(id))
    }

  return (
    <div>
        <div className='w-[90%] m-auto'>
            <div className='flex justify-center gap-4 items-center py-4'>
            <h1 className='text-3xl font-bold text-center py-8'>Users Count: {data.length}</h1>
            <button onClick={() => setModalOpen(true)} className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>+AddUser</button>
            </div>
            <hr className='border-2 border-gray-400 w-[50%] m-auto' />
        </div>
        <div className='w-[90%] m-auto flex flex-wrap justify-center gap-4 py-8'>
            {isLoading && fakeCards.map((item) => (
                <div className='flex flex-col gap-4 w-80 h-72 bg-white rounded-[10px] p-4 shadow-md animate-pulse' key={item}>
                    <div className='h-5 w-3/4 rounded bg-gray-200'></div>
                    <div className='h-5 w-1/2 rounded bg-gray-200'></div>
                    <div className='h-5 w-2/3 rounded bg-gray-200'></div>
                    <div className='h-5 w-full rounded bg-gray-200'></div>
                    <div className='h-5 w-4/5 rounded bg-gray-200'></div>
                    <div className='h-5 w-3/5 rounded bg-gray-200'></div>
                </div>
            ))}
            {isError && <p className='font-bold text-red-500'>{isError}</p>}
            {data.map((item) => (
                <div className='flex flex-col gap-2 w-80 h-auto bg-white rounded-[10px] p-4 shadow-md transition hover:scale-105' key={item.id}>
                    <img className='w-40 h-40 rounded-full object-cover' src={item?.img} alt={item?.name} />
                    <p className='font-bold'>Name: {item?.name}</p>
                    <p className='font-bold'>UserName: {item?.surname}</p>
                    <p className='font-bold'>City: {item?.country}</p>
                    <p className='font-bold'>Email: {item?.email}</p>
                    <p className='font-bold'>Phone Number: {item?.phone}</p>
                    <div className='flex justify-center gap-4 items-center mt-4'>
                        <button className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Edit</button>
                        <button onClick={() => handleDeleteUser(item.id)} className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
                    </div>
                </div>
            ))}
        </div>
        {
            modalOpen && (
                <div className='absolute top-0 left-0 w-full h-full backdrop-blur-xs flex justify-center items-center'>
                    <div className='bg-white rounded-[10px] p-8 w-96'>
                        <button onClick={() => setModalOpen(false)} className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
                        <h2 className='text-2xl font-bold mb-4'>Add New User</h2>
                        <form onSubmit={handlePostUser} className='flex flex-col gap-4'>
                            <input type="text" onChange={(e) => setPostUser({...postuser, name: e.target.value.trim()})} value={postuser.name} placeholder='Name' className='border border-gray-300 rounded px-4 py-2' required />
                            <input type="text" onChange={(e) => setPostUser({...postuser, surname: e.target.value.trim()})} value={postuser.surname} placeholder='Surname' className='border border-gray-300 rounded px-4 py-2' required />
                            <input type="text" onChange={(e) => setPostUser({...postuser, country: e.target.value.trim()})} value={postuser.country} placeholder='Country' className='border border-gray-300 rounded px-4 py-2' required />
                            <input type="email" onChange={(e) => setPostUser({...postuser, email: e.target.value.trim()})} value={postuser.email} placeholder='Email' className='border border-gray-300 rounded px-4 py-2' required />
                            <input type="text" onChange={(e) => setPostUser({...postuser, phone: e.target.value.trim()})} value={postuser.phone} placeholder='Phone' className='border border-gray-300 rounded px-4 py-2' required />
                            <input type="text" onChange={(e) => setPostUser({...postuser, img: e.target.value.trim()})} value={postuser.img} placeholder='Image URL' className='border border-gray-300 rounded px-4 py-2' required />
                            <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add User</button>
                        </form>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Data
