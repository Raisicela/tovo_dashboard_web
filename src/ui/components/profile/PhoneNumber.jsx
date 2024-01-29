import React from 'react'

const PhoneNumber = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Phone number */}
          <div className="col-12 text-center">
            <span>Número de teléfono: <b>{props.phone}</b></span>
          </div>

          {/* Verified */}
          <div className="col-12 text-center">
            <span>
              { props.verified ? 'Número verificado' : 'Esperando verificación' }
            </span>
            <i
              className={`ml-3 fas
                ${props.verified ? 'fa-check-circle' : 'fa-exclamation-triangle'}
              `}
              style={{
                color: props.verified ? 'rgb(30, 193, 84)' : 'orange',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PhoneNumber