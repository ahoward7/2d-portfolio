<template>
  <div class="flex flex-col gap-2">
    <div>{{ `<div class="flex flex-col gap-1 text-xl p-2">` }}</div>
    <div class="flex flex-col gap-1 text-xl pl-7 p-2">
      <CodeComment>// Contact Me</CodeComment>
      <span><CodeKeyword>const </CodeKeyword><CodeVariable>contactInfo</CodeVariable><CodeOperator> = </CodeOperator><CodePunctuation>{</CodePunctuation></span>
      <div class="flex flex-col gap-1 pl-4">
        <span><CodeProperty>linkedIn</CodeProperty><CodePunctuation>: </CodePunctuation><CodeLink url="https://www.linkedin.com/in/avery-howard/">https://www.linkedin.com/in/avery-howard/</CodeLink><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>github</CodeProperty><CodePunctuation>: </CodePunctuation><CodeLink url="https://github.com/ahoward7/">https://github.com/ahoward7/</CodeLink><CodePunctuation>,</CodePunctuation></span>
      </div>
      <span><CodePunctuation>}</CodePunctuation></span>
    </div>
    <div>{{ `</div>` }}</div>
  </div>
</template>