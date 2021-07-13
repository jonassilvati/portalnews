import React from 'react';

const Footer = () => {
    return(
        <section 
            style={{
                backgroundColor:"#ee9b00", 
                color:"#fff",
                padding:'10px 0',
                marginTop: '80px'
            }}
        >
            <div className="container container-fluid">
                <div
                    style={{
                        display:"flex", 
                        justifyContent:"center", 
                        backgroundColor:"#ee9b00", 
                        color:"#fff"
                    }}
                >
                    <span>Desenvolvido por <a style={{color:'#9b2226', textDecoration:'none'}} href="https://github.com/jonassilvati">Jonas da Costa Silva</a></span>
                </div>                
            </div>
        </section>
    )
}

export default Footer;