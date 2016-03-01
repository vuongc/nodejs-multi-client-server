#include <iostream>
#include <unistd.h>
#include <node.h>
#include <v8.h>

void Method(const v8::FunctionCallbackInfo<v8::Value>& args)
{
  v8::Isolate* isolate = args.GetIsolate();
  sleep(5);
  args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Hi client"));
}

void init(v8::Local<v8::Object> target)
{
  NODE_SET_METHOD(target, "hello", Method);
}

NODE_MODULE(addon, init)
