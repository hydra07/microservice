import moment from "moment";
import env from "@/util/validateEnv";
import querystring from "querystring";
import crypto from "crypto";
import qs from "qs";
import { OrderService } from "./order.service";
import UserService from "@/service/user.service";
import ProductService from "./product.service";
import axios from "axios";
export default class VnpayService {
  private readonly tmnCode: string;
  private readonly secretKey: string;
  private readonly vnpUrl: string;
  private readonly returnUrl: string;
  private readonly orderService: OrderService;

  constructor() {
    this.tmnCode = env.VNPAY_TMNCODE;
    this.secretKey = env.VNPAY_HASHSECRET;
    this.vnpUrl = env.VNPAY_URL;
    this.returnUrl = env.VNPAY_RETURN_URL;
    const userService = new UserService();
    const productService = new ProductService();
    this.orderService = new OrderService(userService, productService);
  }
  createPaymentUrl(amount: number, ipAddr: string): string {
    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const orderId = moment(date).format("DDHHmmss");

    const vnpParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: this.tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: this.returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      // vnp_BankCode: "",
    };

    const sortedParams = this.sortObject(vnpParams);
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", this.secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    sortedParams["vnp_SecureHash"] = signed;

    return `${this.vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`;
  }

  processReturn = async (vnpParams: any) => {
    const secureHash = vnpParams["vnp_SecureHash"];
    delete vnpParams["vnp_SecureHash"];
    delete vnpParams["vnp_SecureHashType"];

    const sortedParams = this.sortObject(vnpParams);
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", this.secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      //create order

      return {
        code: vnpParams["vnp_ResponseCode"],
        orderId: vnpParams["vnp_TxnRef"],
      };
    } else {
      return { code: "97" };
    }
  };
  // const order = await this.orderService.getSingle({
  //   where: { id: orderId },
  // });
  // if (!order) {
  //   throw new Error("Order not found");
  // }

  // For demonstration, we're using a mock order

  async vnpayRefund(
    orderId: string,
    createBy: string,
    ipAddr: string
  ): Promise<any> {
    const date = new Date();

    const order = {
      id: orderId,
      total: 60000,
    };

    let vnp_TmnCode = this.tmnCode;
    let vnp_TxnRef = orderId;
    let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");
    let vnp_TransactionDate = vnp_CreateDate;
    let vnp_Amount = (order.total * 100).toString();
    let vnp_TransactionType = "02";
    let vnp_CreateBy = createBy;
    let vnp_RequestId = moment(date).format("HHmmss");
    let vnp_Version = "2.1.0";
    let vnp_Command = "refund";
    let vnp_OrderInfo = `Hoan tien GD ma:${vnp_TxnRef}`;
    let vnp_IpAddr = ipAddr;
    let vnp_TransactionNo = "0";

    let data =
      vnp_RequestId +
      "|" +
      vnp_Version +
      "|" +
      vnp_Command +
      "|" +
      vnp_TmnCode +
      "|" +
      vnp_TransactionType +
      "|" +
      vnp_TxnRef +
      "|" +
      vnp_Amount +
      "|" +
      vnp_TransactionNo +
      "|" +
      vnp_TransactionDate +
      "|" +
      vnp_CreateBy +
      "|" +
      vnp_CreateDate +
      "|" +
      vnp_IpAddr +
      "|" +
      vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", this.secretKey);
    let vnp_SecureHash = hmac.update(Buffer.from(data, "utf-8")).digest("hex");

    let dataObj = {
      vnp_RequestId: vnp_RequestId,
      vnp_Version: vnp_Version,
      vnp_Command: vnp_Command,
      vnp_TmnCode: vnp_TmnCode,
      vnp_TransactionType: vnp_TransactionType,
      vnp_TxnRef: vnp_TxnRef,
      vnp_Amount: vnp_Amount,
      vnp_TransactionNo: vnp_TransactionNo,
      vnp_CreateBy: vnp_CreateBy,
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_TransactionDate: vnp_TransactionDate,
      vnp_CreateDate: vnp_CreateDate,
      vnp_IpAddr: vnp_IpAddr,
      vnp_SecureHash: vnp_SecureHash,
    };

    try {
      const response = await axios.post(this.vnpUrl, dataObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error making refund request:", error);
      throw error;
    }
  }

  sortObject(obj: any) {
    const sorted: any = {};
    const str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
}
