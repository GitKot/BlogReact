import React  from 'react'

function errorFild(props){
   
        const {input, type, meta:{error, touched}} = props
        console.log('....', props)
        const errorText = touched && error && <div style={{color:'red'}}>{error}</div>
        return(
              <div>
                  <label>{input.name}</label>
                  <input {...input} type={type} />
                  {errorText}
              </div>
        )
}

export default errorFild
