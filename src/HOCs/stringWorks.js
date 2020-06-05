import React from 'react';

export default BaseComponent => {
    return function(props){
        const capitalizeFirst = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        const removeHyphen = (str) => {
            return str.split('-').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(' ');
        }
    
        const strWorksObj = {
            capitalizeFirst,
            removeHyphen
        }
    
        return <BaseComponent {...props} strWorks={strWorksObj}/>
    }
}