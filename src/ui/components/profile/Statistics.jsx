import React from 'react'

const Statistics = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* Ratings */}
          <div className="col text-center pt-4">
            <div className="row">
              <div className="col text-center">
                <i
                  className="fas fa-star"
                  style={{
                    color: 'rgb(30, 193, 84)',
                    fontSize: '20px'
                  }}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col text-center">
                <span
                  style={{
                    fontSize: '20px'
                  }}
                >{props.rates}</span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <span>Valoraciones</span>
              </div>
            </div>
          </div>

          {/* Trips */}
          <div className="col text-center pt-4">
            <div className="row">
              <div className="col text-center">
                <i
                  className="fas fa-taxi"
                  style={{
                    color: 'orange',
                    fontSize: '20px'
                  }}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col text-center">
                <span
                  style={{
                    fontSize: '20px'
                  }}
                >{props.trips}</span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <span>Viajes</span>
              </div>
            </div>
          </div>

          {/* CO2 saving */}
          <div className="col text-center pt-4">
            <div className="row">
              <div className="col text-center">
                <i
                  className="fas fa-cloud-sun"
                  style={{
                    color: 'rgb(102, 153, 255)',
                    fontSize: '20px'
                  }}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col text-center">
                <span
                  style={{
                    fontSize: '20px'
                  }}
                > { props.co2Saving
                    ? Math.round(props.co2Saving * 100) / 100
                    : 0
                  } kg
                </span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <span>CO2 ahorrado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistics