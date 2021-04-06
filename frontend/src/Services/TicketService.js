import API from './Base';
import { useReducer, useEffect } from 'react'
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, bugs: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, bugs: action.payload.bugs }
        case ACTIONS.ERROR:
            return { ...state, loading: false, bugs: action.payload.error, bugs: [] }
        default:
            return state
    }
}

// export default function useFetchBugs(params) {

//     const initialState = {
//         bugs:[],
//         loading:true,
//         params:''
//     }

//     const [state, dispatch] = useReducer(reducer, initialState)

//     useEffect(()=>{

//         dispatch({type:ACTIONS.MAKE_REQUEST})
//         API.get('projectlist/',{
//             params:{...params}
//         })
//         .then(res=>{
//             dispatch({
//                 type: ACTIONS.GET_DATA,
//                 payload:{bugs:res.data}
//             })
//         })
//         .catch((e)=>{
//             if(axios.isCancel(e))return
//             dispatch({type:ACTIONS.ERROR,payload:{error:e}})
//         })

//     },[params])    

//     return state

// }

//fetch tickets by Y
export default async function getTickets(pid) {


    // API.get('getTicket/')
    //     .then(response => { arr.push(response.data) })
    //     .catch(err=>{console.log(err)})
    // return arr
    const response = await API.get('getTicket/?project=' + pid);
    const arrr = response.data;
    return (arrr);
}

export async function createTicket(data) {
    await API.post('getTicket/', data);
}

export async function getMonthlyBugSummary(year, month) {
    var date= new Date(year,month+1,0);
    var yyyy=date.getUTCFullYear();
    var mm= date.getUTCMonth();
    var dd=date.getUTCDate();
    var data = await API.get('getBugPerMonth/?date1='+year+'-'+month+'-01&date2='+yyyy+'-'+mm+'-'+dd)
    return(data.data)
}