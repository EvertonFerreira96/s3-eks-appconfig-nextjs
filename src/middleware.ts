/* eslint-disable prettier/prettier */
import { NextResponse, NextRequest,  } from 'next/server'
import { getQueryParamsThroughUrl } from './utils/http/request/getQueryParamsThroughUrl'
import { params } from './params'

export const config = {
    matcher: ['/_next/static/css/app/:filename*', '/_next/static/css/:filename*'],
}

export async function middleware(request: NextRequest) {
    const url = request.headers.get('referer')
    const domain = getQueryParamsThroughUrl(url)?.domain || 'orbia'

    const getFileProvider = getQueryParamsThroughUrl(url)?.fileProvider || 'local'
 

    const urlLocalWhitelabelFiles = new URL(`/themes/_${getFileProvider}_${domain}.layout.css`, request.url);
    const urlCloudFrontFiles = new URL(`${params.aws.cloudFront.whitelabelCss}/${domain}.css`, request.url);
    return NextResponse.redirect(
        getFileProvider === 'local' 
        ? urlLocalWhitelabelFiles
        : urlCloudFrontFiles
        
    )
}
