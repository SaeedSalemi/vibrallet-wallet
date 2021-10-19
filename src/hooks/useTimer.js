import { useEffect, useState } from "react"

export function useTimer(initialTime) {
	const [time, setTime] = useState(initialTime)

	useEffect(() => {
		if (time === 0) {
			clearInterval(handler)
			return
		}
		const handler = setTimeout(() => {
			setTime(prevState => prevState - 1)
		}, 1000)
		return () => {
			clearInterval(handler)
		}
	}, [time])
    const resetTimer = () => {
		setTime(initialTime)
	}

    return [time, resetTimer];
}
