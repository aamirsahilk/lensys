import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import MenIcon from '@/icons/MenIcon'
import WomenIcon from '@/icons/WomenIcon'
import KidIcon from '@/icons/KidIcon'

const Megamenu = () => {
  return (
    <div className='mega-menu-wrapper'>
        <div className="mega-menu-inner">
            <div className="col">
                <h3>SHOP BY GENDER</h3>
                <ul className="gender-list">
                    <li>
                        <Link href="/">
                            <div className="ic">
                                <MenIcon />
                            </div>
                            <span>MEN</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <div className="ic">
                                <WomenIcon />
                            </div>
                            <span>WOMEN</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <div className="ic">
                                <KidIcon />
                            </div>
                            <span>KIDS</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col">
                <h3>SHOP BY BRAND</h3>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <ul>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col">
                <h3>SHOP BY COLOUR</h3>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <ul>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Megamenu