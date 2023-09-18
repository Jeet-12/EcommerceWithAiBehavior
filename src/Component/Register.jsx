import React, { useRef } from 'react'

const Register = () => {

    const sellerAvatar = useRef(null)
    const userAvatar = useRef(null)

    const openTheFile = () =>{
        sellerAvatar.current.click()
    }
    const openTheFile1 = () =>{
        userAvatar.current.click()
    }
    return (

        <div className="register-container">
            <div className="buyer-container">
                <div className="img-upload">
                    <span className='image-upload' onClick={openTheFile}></span>
                    <input type="file" ref={sellerAvatar} style={{ display: "none" }} />
                </div>
                <div className='user-detail'>
                    <h2 style={{ color: "#e0d6d6f2" }}>Seller Details</h2>
                </div>
                <div className="buyer-container-value">
                    <div className="client-image">
                        <img
                            src="https://rb.gy/dk4g6"
                            width={300}
                            height={300}
                            alt="Client Image"/>

                    </div>
                    <div className="input-section-register">
                        <div class="input-group-register">
                            <input required="" type="text" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">First Name</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="text" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Last Name</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="text" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Email</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="number" name="number" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Mobile Number</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="password" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Password</label>
                        </div>
                        <button className="register-submit">
                            Submit
                        </button>
                    </div>
                </div>

            </div>
            <div className="buyer-container">
                <div className="img-upload">
                    <span className='image-upload' onClick={openTheFile1}></span>
                    <input type="file" ref={userAvatar} style={{ display: "none" }} />
                </div>
                <div className='user-detail'>
                    <h2 style={{ color: "#e0d6d6f2" }} >User Details</h2>
                </div>
                <div className="buyer-container-value">
                    <div className="client-image">

                        <img
                            src="https://rb.gy/js085"
                            width={300}
                            height={300}
                            alt="Client Image "
                        />
                    </div>
                    <div className="input-section-register">
                        <div class="input-group-register">
                            <input required="" type="text" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">First Name</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="text" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Last Name</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="text" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Email</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="number" name="number" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Mobile Number</label>
                        </div>
                        <div class="input-group-register">
                            <input required="" type="password" name="text" autocomplete="off" class="input-register" />
                            <label class="user-label-register">Password</label>
                        </div>
                        <button className="register-submit">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
