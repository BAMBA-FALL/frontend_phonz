import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import React from 'react';

const log = () => {




    useEffect(()=>{
        fetchProduct = async()=>{
            try {

                const productData = await productService.post()
                SetProductData(productData.product)
                
            } catch (error) {
                
            }
        }
    })
    return (
        <div>
        

        </div>
    );
};

export default log;