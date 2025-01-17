/**
 * Swagger Petstore
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 *
 * OpenAPI spec version: 1.0.5
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

export interface Category {
  id?: number;
  name?: string;
}

export interface Order {
  /**
   * Simple boolean enum
   */
  bool?: boolean;
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: Date;
  /**
   * Order Status
   */
  status?: OrderStatusEnum;
  complete?: boolean;
}

/**
 * Enum for the status property.
 */
export type OrderStatusEnum = 'placed' | 'approved' | 'delivered';

export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: Array<string>;
  tags?: Array<Tag>;
  /**
   * pet status in the store
   */
  status?: PetStatusEnum;
}

/**
 * Enum for the status property.
 */
export type PetStatusEnum = 'available' | 'pending' | 'sold';

export interface Tag {
  id?: number;
  name?: string;
}

export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  /**
   * User Status
   */
  userStatus?: number;
}

