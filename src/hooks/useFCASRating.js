import React, { useState, useEffect } from 'react'
import HttpService from '../services/HttpService'

const useFCASRating = () => {

  const [state, setState] = useState([])

  useEffect(() => {

    new HttpService("", {
      "uniqueId": "123",
      "action": "fcasListing",
    }).Post(res => {
      // setState(res)
      if (res.length > 0)
        setState(res)
    })

  }, [state])

  return { FCASList: state }
}

export default useFCASRating