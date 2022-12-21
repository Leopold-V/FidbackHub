import { Card } from 'components/common/Card'
import CodeBlock from 'components/common/CodeBlock'
import { DividerTitle } from 'components/common/DividerTitle'
import React from 'react'
import SecretKey from './SecretKey'

const code = 'console.log("hello !)"';

export const InstallationSection = ({ api_key }) => {
  return (
    <>
      <DividerTitle title="Installation" />
      <Card>
        <div className="space-y-4 divide-y-0">
          <SecretKey label={"Project token"} value={api_key} />
          <h3 className="text-center">Code example:</h3>
          <div className="flex items-center justify-center space-x-2">
            <CodeBlock code={code} />
          </div>
        </div>
      </Card>
    </>
  )
}

/*
<div className="flex items-center justify-center space-x-2">
<div className="block font-semibold">
Project Token:
</div>
<div className="sm:col-span-2">
<span className="block text-sm text-gray-700 w-56 overflow-hidden overflow-ellipsis break-before-auto">{api_key}</span> 
</div>
</div>
*/