import {useEffect, useState} from 'react'

const useRoot = () => {
  const [username, setUsername] = useState('')

  useEffect(() => {
		const getRandomName = async () => {
			const url = 'https://random-user-api.p.rapidapi.com/api';
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
					'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
				}
			};

			try {
				const response = await fetch(url, options);
				const result = await response.json();
				// console.log(result.results[0]);
				setUsername(result.results[0].name.first || result.results[0].name.last)
			} catch (error) {
				console.error(error);
			}
		}
		getRandomName()

	}, [])

  return {
    username,
    setUsername
  }
}

export default useRoot