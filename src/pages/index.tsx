import Head from 'next/head'
import { Button, Result } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link'
import { SmileOutlined } from '@ant-design/icons'

export default function Home() {






  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title="Welcome to Free Quiz "
        extra={<Link href={"/soal"}><Button type="primary">Click To Start Quiz</Button></Link>}
      />

    </>
  )
}
