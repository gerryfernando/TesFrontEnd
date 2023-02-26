import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react'


export default function Home() {


    const router = useRouter()
    useEffect(() => {

        var token = localStorage.getItem("token");
        if (!token) {

            router.push("/")


        }
    }, [])

    return (
        <>
            <div style={{ paddingRight: 30, textAlign: "right" }}>
                <Link href={"/"}> <Button danger type='primary' onClick={() => {
                    localStorage.removeItem("token");
                }}>Logout</Button></Link>
            </div>
            <Result
                icon={<SmileOutlined />}
                title="Welcome to Free Quiz "
                extra={<Link href={"/soal"}><Button type="primary">Click To Start Quiz</Button></Link>}
            />

        </>
    )
}
