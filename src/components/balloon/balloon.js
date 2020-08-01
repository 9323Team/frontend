import React from 'react'
import './balloon.scss'
const ballon = props=> (
    <div className='welcome__animations'>
            <svg viewBox="0 0 64 64" className='svg'>
                <g className="balloon" stroke={props.stroke} fill={props.fill} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                    <path className="balloon-body" d="M16,20 q0,-16 16,-16 q16,0 16,16
                        q0,8 -8,16 q-8,8-8,16
                        q0,-8 -8,-16 q-8,-8 -8,-16"  />
                    
                    <path d="M24,24 q0,8 8,8 q8,0 8,-8" />
                    
                    <circle cx="26" cy="16" r="3" fill="#fff" />
                    <circle cx="26.5" cy="16.5" r=".5" fill="#000" />
                    <circle cx="38" cy="16" r="3" fill="#fff" />
                    <circle cx="37.5" cy="16.5" r=".5" fill="#000" />
                </g>
            </svg>
        </div>

)
export default ballon;