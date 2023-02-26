import { Button, Card, Form, Input, Row } from 'antd';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from "yup";

export default function Home() {

  const [userData, setuserData] = useState({ username: "", password: "" })
  const router = useRouter()
  return (
    <>
      <Row justify={'center'} className='login-page' style={{ textAlign: "center", marginTop: 50 }}>

        <Card title={<div style={{ fontSize: 25, fontWeight: "bold" }}>Login</div>} className='card-login'>
          <Form layout='vertical'>
            <Formik
              enableReinitialize
              initialValues={userData}
              validationSchema={yup.object().shape({
                username: yup.string().required("This is Required Field"),
                password: yup.string().required("This is Required Field"),
              })}
              onSubmit={(values) => {
                localStorage.setItem("token", "tes")
                router.push("/landing")
              }}
            >{({ handleSubmit, values, errors, touched, handleChange, setFieldValue, handleBlur, setFieldTouched }) => (
              <>
                <Form.Item required label="Username" validateStatus={errors.username && touched.username ? "error" : ""} help={errors.username && touched.username ? errors.username : null}>
                  <Input value={values.username} onChange={(e: any) => {
                    setFieldValue("username", e.target.value)
                  }} />
                </Form.Item>
                <Form.Item required label="Password" validateStatus={errors.password && touched.password ? "error" : ""} help={errors.password && touched.password ? errors.password : null}>
                  <Input.Password value={values.password} onChange={(e: any) => {
                    setFieldValue("password", e.target.value)
                  }} />
                </Form.Item>
                <Form.Item>
                  <Button onClick={() => {
                    handleSubmit()
                  }} type="primary">Login</Button>
                </Form.Item>
              </>
            )}
            </Formik>
          </Form>
        </Card>
      </Row>
    </>
  )
}
