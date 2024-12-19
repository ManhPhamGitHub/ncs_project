import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  notification,
  Typography,
  Card,
  Row,
  Col,
} from "antd";
import axios from "axios";

const { Option } = Select;
const { Title, Paragraph } = Typography;

interface Symptom {
  id: number;
  name: string;
}

interface HealthFormData {
  name: string;
  temperature: number;
  symptomIds: number[];
  contactWithSuspected: boolean;
  additionalNotes?: string;
}

export const HealthForm: React.FC = () => {
  const [form] = Form.useForm();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/symptoms`
        );
        setSymptoms(response.data);
      } catch (error) {
        api.error({
          message: "Failed to load symptoms. Please try again.",
        });
      }
    };

    fetchSymptoms();
  }, []);

  const onFinish = async (values: HealthFormData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/health-declarations`,
        values
      );
      api.success({
        message: "Form submitted successfully!",
      });
      form.resetFields();
    } catch (error) {
      api.error({ message: "Submission failed. Please try again." });
    }
  };

  return (
    <Row justify="center" style={{ padding: "20px" }}>
      {contextHolder}

      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          bordered={false}
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            Health Declaration Form
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: "24px" }}>
            Please fill out the form below with accurate information to help us
            ensure everyone's safety.
          </Paragraph>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Body Temperature (°C)"
              name="temperature"
              rules={[
                { required: true, message: "Please enter your temperature!" },
              ]}
            >
              <Input type="number" placeholder="Enter your temperature" />
            </Form.Item>

            <Form.Item
              label="Symptoms"
              name="symptomIds"
              rules={[
                { required: true, message: "Please select your symptoms!" },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select your symptoms"
                allowClear
              >
                {symptoms.map((symptom) => (
                  <Option key={symptom.id} value={symptom.id}>
                    {symptom.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Contact with suspected COVID-19 case?"
              name="contactWithSuspected"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Additional Notes" name="additionalNotes">
              <Input.TextArea
                placeholder="Provide any additional information"
                rows={4}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Form
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
