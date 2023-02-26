import { Button, Card, Col, Form, Popconfirm, Radio, Row, Skeleton, Space, Tag, Typography } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function soal() {

    const router = useRouter()
    const [current, setcurrent] = useState(0)
    const [data, setdata] = useState([]) as any
    const [loading, setloading] = useState(true)
    useEffect(() => {
        var token = localStorage.getItem("token");
        if (token) {

            var x = localStorage.getItem("data");
            if (x) {
                setdata(JSON.parse(x))
                setloading(false)

            } else {

                getData()
            }
        } else {
            router.push("/")
        }



    }, [])


    function getData() {
        axios.get("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple").then((res: any) => {
            let arr = [] as any
            console.log(res.data.results)

            res.data.results.forEach((item: any) => {
                let pushArray = [...item.incorrect_answers]
                pushArray.push(item.correct_answer)
                let temp = [...pushArray] as any
                arr.push({ ...item, answer: undefined, choices: shuffle(temp) })

            })
            console.log(arr)
            setdata(arr)
            setloading(false)
        })
    }


    function shuffle<T>(array: T[]): T[] {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    };
    return (
        <>
            <div style={{ paddingRight: 30, textAlign: "right" }}>
                <Link href={"/"}> <Button onClick={() => {
                    localStorage.removeItem("token");
                }} danger type='primary'>Logout</Button></Link>
            </div>
            <div className='layout-main' style={{}}>

                <Typography.Title style={{ textAlign: 'center' }} level={1}>Free Quiz</Typography.Title>
                <Card style={{}}>
                    {loading ? <Skeleton active /> : <>

                        <Form layout='vertical'>
                            {data.map((item: any, index: number) => {
                                return (
                                    <Form.Item style={{ display: current === index ? "" : "none" }} key={index + "form"} label={(index + 1) + ". " + item.question}>
                                        <Space wrap direction='vertical'>
                                            <Tag style={{ fontWeight: "bold" }}> {item.category}</Tag>
                                            <Radio.Group key={index + "radio"} onChange={(e) => {
                                                const copy = [...data]
                                                const tempIndex = { ...copy[index] }
                                                tempIndex.answer = e.target.value
                                                copy[index] = tempIndex
                                                setdata(copy)
                                            }} value={item.answer} >
                                                <Space direction='vertical' wrap>
                                                    {item.choices.map((value: any) => {
                                                        return (
                                                            <Radio value={value}>{value}</Radio>
                                                        )
                                                    })}
                                                </Space>

                                            </Radio.Group>
                                        </Space>

                                    </Form.Item>
                                )
                            })}
                        </Form>
                    </>
                    }
                    <Row gutter={[10, 10]} justify={"space-between"}>
                        <Col>
                            <Button onClick={() => {
                                localStorage.setItem("data", JSON.stringify(data));
                                setcurrent(current - 1)
                            }} type="primary" disabled={current === 0} >Prev</Button>

                        </Col>
                        <Col>
                            <Button onClick={() => {
                                localStorage.setItem("data", JSON.stringify(data));

                                setcurrent(current + 1)
                            }} type="primary" disabled={current === data.length - 1} style={{}} >Next</Button>

                        </Col>
                    </Row>
                </Card>

                <Row style={{ marginTop: 30 }} justify={'center'}>
                    <Col>
                        <Popconfirm
                            title="Submit Your Form"
                            description="Are you sure to submit this form?"
                            onConfirm={() => {
                                localStorage.setItem("data", JSON.stringify(data));
                                router.push('/soal/result')
                            }}

                            okText="Yes"
                            cancelText="No"
                        >
                            <Button onClick={() => {

                            }} type="primary" style={{ backgroundColor: "#00FF00", fontWeight: "bold" }} >Submit</Button>
                        </Popconfirm>
                    </Col>
                </Row>

            </div>
        </>

    )
}
