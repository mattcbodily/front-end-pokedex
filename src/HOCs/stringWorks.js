import React from 'react';

export default BaseComponent => {
    return function(props){
        const capitalizeFirst = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    
        const strWorksObj = {
            capitalizeFirst
        }
    
        return <BaseComponent {...props} strWorks={strWorksObj}/>
    }
}