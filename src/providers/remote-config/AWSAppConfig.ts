/* eslint-disable prettier/prettier */

import {
    AppConfigClient,
    ListConfigurationProfilesCommand
} from '@aws-sdk/client-appconfig';

import {
    AppConfigDataClient,
    GetLatestConfigurationCommand,
    StartConfigurationSessionCommand,
} from '@aws-sdk/client-appconfigdata';

import { env } from '@/env'

const AWS_CONFIG_PARAMETERS = {
    AWS_APPCONFIG_NAME: env.AWS_APPCONFIG_NAME,
    AWS_SESSION_TOKEN: env.AWS_SESSION_TOKEN,
    AWS_REGION: env.AWS_REGION,
    AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
    APP_CONFIG_APP_ID: env.APP_CONFIG_APP_ID,
    APP_CONFIG_ENVIRONMENT_ID: env.APP_CONFIG_ENVIRONMENT_ID,
}

const awsAppBaseConfigClient = new AppConfigClient({
    region: AWS_CONFIG_PARAMETERS.AWS_REGION,
    credentials: {
        accessKeyId: AWS_CONFIG_PARAMETERS.AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_CONFIG_PARAMETERS.AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_CONFIG_PARAMETERS.AWS_SESSION_TOKEN,
    },
});

const awsAppDataConfigClient = new AppConfigDataClient({
    region: AWS_CONFIG_PARAMETERS.AWS_REGION,
    credentials: {
        accessKeyId: AWS_CONFIG_PARAMETERS.AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_CONFIG_PARAMETERS.AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_CONFIG_PARAMETERS.AWS_SESSION_TOKEN,
    },
});


interface IAWSAppConfigWhitelabelProfileData {
    [key: string]: JSON;
}

export const GetAWSAppConfigWhitelabelProfiles = async (): Promise<IAWSAppConfigWhitelabelProfileData[]> => {

    const getAppConfigProfiles = (
        await awsAppBaseConfigClient.send(
            new ListConfigurationProfilesCommand({
                ApplicationId: AWS_CONFIG_PARAMETERS.APP_CONFIG_APP_ID,
            }))).Items || [];

    return Object.fromEntries(
        await Promise.all(
            getAppConfigProfiles.map(async profile => {

                const session = await awsAppDataConfigClient.send(
                    new StartConfigurationSessionCommand({
                        ApplicationIdentifier: AWS_CONFIG_PARAMETERS.APP_CONFIG_APP_ID,
                        EnvironmentIdentifier: AWS_CONFIG_PARAMETERS.APP_CONFIG_ENVIRONMENT_ID,
                        ConfigurationProfileIdentifier: profile.Id!,
                        RequiredMinimumPollIntervalInSeconds: 15
                    }));


                const content = await awsAppDataConfigClient.send(new GetLatestConfigurationCommand({
                    ConfigurationToken: session.InitialConfigurationToken!,
                }));

                return [
                    profile.Name!,
                    JSON.parse(new TextDecoder().decode(content.Configuration as unknown as ArrayBuffer).replaceAll('!important', ''))]
            })) || [])

} 