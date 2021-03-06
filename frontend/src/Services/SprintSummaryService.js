import API from './Base';
import { useReducer, useEffect } from 'react'
import axios from 'axios'

export default async function sprintSummary(id = 0) {
    if (id == 0) {
        const response = await API.get('getSprintSummary/');
        const arr = response.data;
        return (arr);
    }
    else if (id>0){
        const response = await API.get('getSprintSummary/?id=' + id)
        const arr = response.data;
        return(arr)
    }

}