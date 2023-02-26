import { Button, Modal, Result, Space } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function result() {

    const [score, setscore] = useState(0)
    useEffect(() => {

        var x = localStorage.getItem("data");
        if (x) {
            const arr = JSON.parse(x) as any
            let sum = 0 as any
            arr.forEach((item: any) => {
                if (item.answer === item.correct_answer) {
                    sum++
                }
            })
            let tempScore = (sum / arr.length).toFixed(2) as any
            setscore(tempScore * 100)
        } else {
            Modal.error({ title: "No Data" })
        }

    }, [])

    return (
        <>
            <Result
                status="success"
                title={<Space direction='vertical' wrap>
                    <div>Successfully Submit Your Quiz </div>
                    <div>Your Score : {score} / 100</div>
                </Space>}
                subTitle="Thank You For Submitting"
                extra={[
                    <Link href={"/landing"}><Button type="primary" onClick={() => {
                        localStorage.removeItem("data");

                    }}>Back To Landing Page</Button></Link>,
                ]}
            />

        </>
    )
}
