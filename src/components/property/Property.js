// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import Create_Advertisment from '../Create_Advertisment';
// import Edite from '../Edite';
// const Property = () => {
//     const[data,setData]=useState([]);
//     const[update,setUpdate]=useState(-1);

  
//     useEffect(()=>{
//         axios.get('http://localhost:5000/api/property').then(res =>setData(res.data)).catch(err=>console.log(err));
//     },[])
      
//  function edite(ind){
//  setUpdate(ind);
//  }

//   return (
//     <>
//        <table>
//               <thead>
                  
//             <th>title</th>
//             <th>address</th>
//             <th>property</th>
//             <th> rent</th>
//             <th>maintenance</th>
//             <th>rooms</th>
//             <th>area</th>
//             <th>bathrooms</th>
//             <th>parking</th>
//             <th>description</th>
//             <th>additional</th>
//         </thead>
//         <tbody>
//         {
//     data.map((user,index) =>{
//         return(
//             update ===index ? <Edite user={user} data={data} setData={setData}   /> :
//             <tr key={index}>
//             <td>{user.title}</td>
//             <td>{user.address}</td>
//             <td>{user.property}</td>
//             <td>{user.rent}</td>
//             <td>{user.maintenance}</td>
//             <td>{user.rooms}</td>
//             <td>{user.area}</td>
//             <td>{user.bathrooms}</td>
//             <td>{user.parking}</td>
//             <td>{user.description}</td>
//             <td>{user.additional}</td>
//            <td>
//           <button onClick={()=>edite(index)}>Edite</button>
//            </td>
            
            
//             </tr>
//         )
//     })
// }
//         </tbody>
//        </table>
    
//     </>
//   )
// }

// export default Property;

