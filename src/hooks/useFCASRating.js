import React, { useState, useEffect } from 'react'
import HttpService from '../services/HttpService'

const useFCASRating = () => {

  const [state, setState] = useState({
    list: []
  })
  const { list } = state

  useEffect(() => {

    new HttpService("", {
      "uniqueId": "123",
      "action": "fcasListing",
    }).Post(res => {
      if (res.length > 0)
        setState(res)

    })

  }, [list])

  return { list }
}

export default useFCASRating