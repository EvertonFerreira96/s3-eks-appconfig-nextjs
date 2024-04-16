/* eslint-disable prettier/prettier */
 
import { env } from '@/env'
import AWS from 'aws-sdk';

const AWS_CONFIG_PARAMETERS = {
    AWS_APPCONFIG_NAME: env.AWS_APPCONFIG_NAME,
    AWS_SESSION_TOKEN: env.AWS_SESSION_TOKEN || "",
    AWS_REGION: env.AWS_REGION,
    AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
    APP_CONFIG_APP_ID: env.APP_CONFIG_APP_ID,
    APP_CONFIG_ENVIRONMENT_ID: env.APP_CONFIG_ENVIRONMENT_ID,
}
 
export const GetAWSFilesInCloudFrontBucket = async (domain: string): Promise<void> => {

AWS.config.update({
  accessKeyId: AWS_CONFIG_PARAMETERS.AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG_PARAMETERS.AWS_SECRET_ACCESS_KEY,
  region: AWS_CONFIG_PARAMETERS.AWS_REGION
});
   
// TODO

}
