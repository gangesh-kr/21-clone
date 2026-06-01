import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DIVISION_DATA = {
  trading: {
    title: 'TWENTY1GLOBAL TRADING',
    subtitle: 'Sourcing and delivering high-quality global commodities with airtight execution and deep logistical management.',
    tabs: [
      {
        id: 'oil',
        label: 'Oil & Products',
        cards: [
          { title: 'Crude Oil', text: 'Sourcing crude from global producing regions for international refining systems. We facilitate bulk logistics and coordinate delivery routes across major trans-oceanic shipping corridors.' },
          { title: 'Naphtha', text: 'Trading chemical-grade feedstocks for international polymer and petrochemical manufacturing networks. We ensure consistent quality audits to meet precise industrial specifications.' },
          { title: 'Gasoline', text: 'Comprehensive supply of gasoline grades and premium components to retail and wholesale distribution lines. We leverage regional storage nodes to optimize delivery timelines.' },
          { title: 'Middle Distillates', text: 'Supplying high-quality gasoil and aviation fuel assets across strategic logistical corridors. We secure allocations from vetted suppliers to safeguard supply reliability.' },
          { title: 'Fuel Oil', text: 'Blending premium low-sulfur and high-sulfur fuel oils for marine bunkering and global utility power grids. Our systems ensure full compliance with international emissions targets.' }
        ]
      },
      {
        id: 'lpg',
        label: 'LPG',
        cards: [
          { title: 'Liquefied Petroleum Gas', text: 'Coordinating international LPG freight and supply streams from key terminals to emerging demand markets. We manage custom shipping frameworks utilizing modern gas transport vessels.' }
        ]
      },
      {
        id: 'metals',
        label: 'Metals & Bulk',
        cards: [
          {
            title: 'Base Metals & Ferroalloys', text: 'Strategic sourcing of copper, alumin
              < truncated 10707 bytes >