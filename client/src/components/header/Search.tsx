import { Command } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { useState } from 'react';
export default function Search() {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <Command className={cn('h-auto overflow-visible bg-transparent')}>
      <div
        className={cn(
          'min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        )}
      >
        <div className="flex flex-wrap gap-1">
          {/* {selected.map((option) => {
              return (
                <Badge
                  key={option.value}
                  className={cn(
                    'data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground',
                    'data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground',
                    badgeClassName,
                  )}
                  data-fixed={option.fixed}
                  data-disabled={disabled || undefined}
                >
                  {option.label}
                  <button
                    className={cn(
                      'ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      (disabled || option.fixed) && 'hidden',
                    )}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(option);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })} */}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            // {...inputProps}
            // ref={inputRef}
            value={inputValue}
            // disabled={disabled}
            onValueChange={(value) => {
              setInputValue(value);
              // inputProps?.onValueChange?.(value);
            }}
            // onBlur={(event) => {
            //   setOpen(false);
            //   inputProps?.onBlur?.(event);
            // }}
            // onFocus={(event) => {
            //   setOpen(true);
            //   triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
            //   inputProps?.onFocus?.(event);
            // }}
            // placeholder={hidePlaceholderWhenSelected && selected.length !== 0 ? '' : placeholder}
            className={cn(
              'flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
              // {
              //   'w-full': hidePlaceholderWhenSelected,
              //   'px-3 py-2': selected.length === 0,
              //   'ml-1': selected.length !== 0,
              // },
              // inputProps?.className,
            )}
          />
        </div>
      </div>
      <div className="relative">
        {/* {open && (
            <CommandList className="absolute top-1 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              {isLoading ? (
                <>{loadingIndicator}</>
              ) : (
                <>
                  {EmptyItem()}
                  {CreatableItem()}
                  {!selectFirstItem && <CommandItem value="-" className="hidden" />}
                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup key={key} heading={key} className="h-full overflow-auto">
                      <>
                        {dropdowns.map((option) => {
                          return (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disable}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                if (selected.length >= maxSelected) {
                                  onMaxSelected?.(selected.length);
                                  return;
                                }
                                setInputValue('');
                                const newOptions = [...selected, option];
                                setSelected(newOptions);
                                onChange?.(newOptions);
                              }}
                              className={cn(
                                'cursor-pointer',
                                option.disable && 'cursor-default text-muted-foreground',
                              )}
                            >
                              {option.label}
                            </CommandItem>
                          );
                        })}
                      </>
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )} */}
      </div>
    </Command>
  );
}
