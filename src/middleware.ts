/* eslint-disable prettier/prettier */
import { NextResponse, NextRequest,  } from 'next/server'
import { getQueryParamsThroughUrl } from './utils/http/request/getQueryParamsThroughUrl'

export const config = {
    matcher: ['/_next/static/css/app/:filename*', '/_next/static/css/:filename*'],
}

export async function middleware(request: NextRequest) {
    const host = request.headers.get('host')
    const url = request.headers.get('referer')
    const domain = host?.indexOf('.') !== -1 ? host?.split('.')[0] : 'orbia'

    const getFileProvider = getQueryParamsThroughUrl(url)?.fileProvider || 'local'
 

    const urlLocalWhitelabelFiles = new URL(`/themes/_${getFileProvider}_${domain}.layout.css`, request.url);
    const urlCloudFrontFiles = new URL(`https://d2onhdkn7w90qy.cloudfront.net/${domain}.css`, request.url);

    return NextResponse.redirect(
        getFileProvider === 'local' 
        ? urlLocalWhitelabelFiles
        : urlCloudFrontFiles
        
    )
}
