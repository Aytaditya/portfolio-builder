"use client"
import React from 'react'
import BasicDetail from './BasicDetail'
import { motion } from 'framer-motion';

const FormComponent = () => {
  return (
    <div className='py-12 px-6'>
        <motion.h2
            className='text-3xl font-bold text-gray-300 font-enrich'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            Start 
            <span className='text-[#5f58e2] ml-2'>Designing</span> your portfolio page
        </motion.h2>
      <BasicDetail/>
    </div>
  )
}

export default FormComponent
